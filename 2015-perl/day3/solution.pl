use strict;
use warnings;
use Switch;
use Data::Dumper;

my @aLines = ();
open(my $fh, '<', 'input.txt');
while(defined(my $sLine = <$fh>)) {
  chomp($sLine);
  push(@aLines, $sLine);
}
close($fh);

sub one {
  my @aChars = split('', $aLines[0]);
  my ($sCount, $x, $y) = (1, 0, 0);
  my %hMap = (
    0 => {
      0 => 1
    }
  );

  foreach my $sChar (@aChars) {

    switch ($sChar) {
      case '^' {
        $y++;
      }
      case '>' {
        $x++;
      }
      case 'v' {
        $y--;
      }
      case '<' {
        $x--;
      }
    }

    if(!defined($hMap{$x}{$y})) {
      $hMap{$x}{$y} = 1;
    }

    $sCount++;
  }

  my $sRval = 0;
  foreach my $sKey (keys %hMap) {
    $sRval += scalar(keys %{$hMap{$sKey}});
  }

  return $sRval;
}

sub two {
  my @aChars = split('', $aLines[0]);

  my %hLocation = (
    'santa' => {
      'x' => 0,
      'y' => 0
    },
    'robot' => {
      'x' => 0,
      'y' => 0
    }
  );
  my %hMap = (
    0 => {
      0 => 1
    }
  );

  my $sCount = 0;
  foreach my $sChar (@aChars) {
    my $sEntity = ($sCount % 2 == 0) ? 'santa' : 'robot';

    switch ($sChar) {
      case '^' {
        $hLocation{$sEntity}{'y'}++;
      }
      case '>' {
        $hLocation{$sEntity}{'x'}++;
      }
      case 'v' {
        $hLocation{$sEntity}{'y'}--;
      }
      case '<' {
        $hLocation{$sEntity}{'x'}--;
      }
    }

    if(!defined($hMap{$hLocation{$sEntity}{'x'}}{$hLocation{$sEntity}{'y'}})) {
      $hMap{$hLocation{$sEntity}{'x'}}{$hLocation{$sEntity}{'y'}} = 1;
    }

    $sCount++;
  }

  my $sRval = 0;
  foreach my $sKey (keys %hMap) {
    $sRval += scalar(keys %{$hMap{$sKey}});
  }

  return $sRval;
}

print "Solution one is: " . one() . "\n";
print "Solution two is: " . two() . "\n";
