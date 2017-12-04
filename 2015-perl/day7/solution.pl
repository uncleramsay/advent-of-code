use strict;
use warnings;
use Switch;
use Scalar::Util qw(looks_like_number);
use Data::Dumper;

my @aLines = ();
open(my $fh, '<', 'input.txt');
while(defined(my $sLine = <$fh>)) {
  chomp($sLine);
  push(@aLines, $sLine);
}
close($fh);

my %hWires = ();

sub one {
  init();
  return findWire('a');
}

sub two {
  my $sBValue = shift @_;

  %hWires = ();
  init();
  $hWires{'b'} = $sBValue;
  return findWire('a');
}

sub init {
  foreach my $sLine (@aLines) {

    # Assignments
    if ($sLine =~ /^(\w+) -> (\w+)$/) {
      my ($sLeft, $sWire) = ($1, $2);

      $hWires{$sWire} = $sLeft;
    }

    elsif ($sLine =~ /^((?:\w+\s)?\w+ \w+) -> (\w+)$/) {
      my ($sInstruction, $sWire) = ($1, $2);

      $hWires{$sWire} = $sInstruction;
    }
  }
}

sub findWire {
  my $sOutput = shift @_;

  while(!defined($hWires{$sOutput}) || !looks_like_number($hWires{$sOutput})) {

    foreach my $sWire (keys %hWires) {
      my $sInstruction = $hWires{$sWire};

      next if(looks_like_number($sInstruction));

      # Two parters
      if ($sInstruction =~ /^(\S+)\s(\S+)\s(\S+)$/) {
        my ($sLeft, $sOperator, $sRight) = ($1, $2, $3);

        $sLeft = $hWires{$sLeft} unless (looks_like_number($sLeft));
        $sRight = $hWires{$sRight} unless (looks_like_number($sRight));

        if(looks_like_number($sLeft) && looks_like_number($sRight)) {

          switch ($sOperator) {
            case 'AND' {
              my $sRval = $sLeft & $sRight;
              print "$sWire = $sInstruction = $sLeft $sOperator $sRight = $sRval\n";
              $hWires{$sWire} = $sRval;
            }

            case 'OR' {
              my $sRval = $sLeft | $sRight;
              print "$sWire = $sInstruction = $sLeft $sOperator $sRight = $sRval\n";
              $hWires{$sWire} = $sRval;
            }

            case 'LSHIFT' {
              my $sRval = $sLeft << $sRight;
              print "$sWire = $sInstruction = $sLeft $sOperator $sRight = $sRval\n";
              $hWires{$sWire} = $sRval;
            }

            case 'RSHIFT' {
              my $sRval = $sLeft >> $sRight;
              print "$sWire = $sInstruction = $sLeft $sOperator $sRight = $sRval\n";
              $hWires{$sWire} = $sRval;
            }
          }
        }
      }
      elsif ($sInstruction =~ /^NOT\s(\S+)$/) {
        my $sRight = $1;

        $sRight = $hWires{$sRight};

        if(looks_like_number($sRight)) {
          my $sRval = ~$sRight;
          print "$sWire = $sInstruction = NOT $sRight = $sRval\n";
          $hWires{$sWire} = $sRval;
        }
      }
      else {
        my $sValue = $hWires{$sInstruction};

        if(looks_like_number($sValue)) {
          print "$sWire = $sInstruction = $sValue\n";
          $hWires{$sWire} = $sValue;
        }
      }

      if(looks_like_number($hWires{$sOutput})) {
        return $hWires{$sOutput};
      }
    }
  }
}

my $sOne = one();
my $sTwo = two($sOne);

print "\n";
print "Solution one is: " . $sOne . "\n";
print "Solution two is: " . $sTwo . "\n";
