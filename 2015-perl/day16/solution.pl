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

my %hAnalysis = (
  'children' => 3,
  'cats' => 7,
  'samoyeds' => 2,
  'pomeranians' => 3,
  'akitas' => 0,
  'vizslas' => 0,
  'goldfish' => 5,
  'trees' => 3,
  'cars' => 2,
  'perfumes' => 1
);

my %hSues = ();

sub one {
  SUE:
  foreach my $sSue (keys %hSues) {

    foreach my $sType (keys %{$hSues{$sSue}}) {
      next SUE if ($hSues{$sSue}{$sType} != $hAnalysis{$sType});
    }

    return $sSue;
  }

  return '';
}

sub two {
  SUE:
  foreach my $sSue (keys %hSues) {

    foreach my $sType (keys %{$hSues{$sSue}}) {

      switch ($sType) {
        case /cats|trees/ {
          next SUE if ($hSues{$sSue}{$sType} <= $hAnalysis{$sType});
        }

        case /pomeranians|goldfish/ {
          next SUE if ($hSues{$sSue}{$sType} >= $hAnalysis{$sType});
        }

        else {
          next SUE if ($hSues{$sSue}{$sType} != $hAnalysis{$sType});
        }
      }
    }

    return $sSue;
  }

  return '';
}

sub parse {
  foreach my $sLine (@aLines) {
    my ($sSue) = $sLine =~ /^Sue (\d+):/;

    while($sLine =~ / (\w+): (\d+)/g) {
      $hSues{$sSue}{$1} = $2;
    }
  }
}

parse();
print "Solution one is: " . one() . "\n";
print "Solution two is: " . two() . "\n";
